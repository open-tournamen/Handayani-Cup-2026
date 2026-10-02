import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://shewccwnxllmlvmedojs.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_cbzEMRvmgAfNEZU5dR0TDA_HhR6v-2S';

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export const DEFAULT_STORAGE_BUCKET = 'tournament-documents';

/**
 * Pastikan bucket penyimpanan ada di Supabase Storage
 */
export async function ensureStorageBucket(bucketName: string = DEFAULT_STORAGE_BUCKET): Promise<boolean> {
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    if (error) {
      console.warn('Supabase storage.listBuckets warning:', error.message);
      return false;
    }

    const exists = buckets?.some((b) => b.name === bucketName);
    if (!exists) {
      console.log(`Membuat Supabase storage bucket '${bucketName}'...`);
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 15728640, // 15MB
      });
      if (createError) {
        console.warn('Warning creating bucket:', createError.message);
      }
    } else {
      // Update bucket to ensure public access & unrestricted mime types
      await supabase.storage.updateBucket(bucketName, {
        public: true,
        fileSizeLimit: 15728640,
        allowedMimeTypes: undefined,
      });
    }
    return true;
  } catch (err) {
    console.warn('Error in ensureStorageBucket:', err);
    return false;
  }
}

/**
 * Unggah file buffer / base64 ke Supabase Storage
 */
export async function uploadToSupabaseStorage({
  fileBuffer,
  fileName,
  contentType,
  bucketName = DEFAULT_STORAGE_BUCKET,
}: {
  fileBuffer: Buffer;
  fileName: string;
  contentType: string;
  bucketName?: string;
}): Promise<{ url: string; path: string; error?: string }> {
  try {
    await ensureStorageBucket(bucketName);

    // Sanitasi nama file & tambahkan timestamp agar unik
    const cleanName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `docs/${Date.now()}_${cleanName}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (error) {
      console.error('Supabase upload error:', error.message);
      return { url: '', path: '', error: error.message };
    }

    const { data: publicData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    return {
      url: publicData.publicUrl,
      path: data.path,
    };
  } catch (err: any) {
    console.error('Exception uploading to Supabase Storage:', err);
    return { url: '', path: '', error: err.message || 'Upload failed' };
  }
}

/**
 * Uji koneksi ke Supabase
 */
export async function testSupabaseHealth(): Promise<{
  connected: boolean;
  url: string;
  bucket: string;
  message: string;
}> {
  try {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
      return {
        connected: false,
        url: SUPABASE_URL,
        bucket: DEFAULT_STORAGE_BUCKET,
        message: error.message,
      };
    }
    return {
      connected: true,
      url: SUPABASE_URL,
      bucket: DEFAULT_STORAGE_BUCKET,
      message: `Terhubung ke Supabase Project (${data.length} buckets tersedia)`,
    };
  } catch (err: any) {
    return {
      connected: false,
      url: SUPABASE_URL,
      bucket: DEFAULT_STORAGE_BUCKET,
      message: err.message || 'Koneksi gagal',
    };
  }
}
