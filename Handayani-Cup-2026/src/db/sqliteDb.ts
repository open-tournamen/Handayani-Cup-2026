import { DatabaseSync } from 'node:sqlite';
import fs from 'fs';
import path from 'path';

// Suppress single experimental warning for node:sqlite
const origEmit = process.emit;
// @ts-ignore
process.emit = function (name: string, data: any, ...rest: any[]) {
  if (name === 'warning' && typeof data === 'object' && data?.name === 'ExperimentalWarning') {
    return false;
  }
  // @ts-ignore
  return origEmit.apply(process, [name, data, ...rest]);
};

declare global {
  var _sqliteDbInstance: DatabaseSync | undefined;
}

export function getSqliteDatabase(): DatabaseSync {
  if (!global._sqliteDbInstance) {
    const dataDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const dbFilePath = path.join(dataDir, 'tournament.sqlite');
    const db = new DatabaseSync(dbFilePath);

    // Enable WAL mode for high concurrency and performance
    db.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA synchronous = NORMAL;
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS tournament_configs (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        tagline TEXT,
        edition TEXT NOT NULL,
        category TEXT NOT NULL,
        max_age_limit INTEGER,
        min_age_limit INTEGER,
        max_teams INTEGER NOT NULL,
        min_players_per_team INTEGER NOT NULL,
        max_players_per_team INTEGER NOT NULL,
        registration_fee INTEGER NOT NULL,
        registration_deadline TEXT NOT NULL,
        tournament_start_date TEXT NOT NULL,
        tournament_end_date TEXT NOT NULL,
        stadium_venue TEXT NOT NULL,
        city TEXT NOT NULL,
        organizer TEXT NOT NULL,
        contact_person TEXT NOT NULL,
        contact_phone TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS teams (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        code TEXT NOT NULL,
        origin_city TEXT NOT NULL,
        origin_province TEXT NOT NULL,
        established_year INTEGER NOT NULL,
        logo_url TEXT,
        primary_jersey_color TEXT NOT NULL,
        secondary_jersey_color TEXT NOT NULL,
        stadium_home TEXT,
        manager_name TEXT NOT NULL,
        manager_phone TEXT NOT NULL,
        head_coach_name TEXT NOT NULL,
        registration_date TEXT NOT NULL,
        status TEXT NOT NULL,
        payment_status TEXT NOT NULL,
        paid_amount INTEGER NOT NULL,
        payment_date TEXT,
        receipt_number TEXT,
        assigned_group TEXT,
        screening_notes TEXT,
        team_bpjs_document_url TEXT,
        portal_username TEXT,
        portal_password TEXT,
        credentials_issued_at TEXT,
        officials_json TEXT NOT NULL,
        players_json TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS matches (
        id TEXT PRIMARY KEY,
        match_number INTEGER NOT NULL,
        stage TEXT NOT NULL,
        matchday INTEGER NOT NULL,
        home_team_id TEXT NOT NULL,
        away_team_id TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        venue TEXT NOT NULL,
        referee TEXT,
        status TEXT NOT NULL,
        home_score INTEGER,
        away_score INTEGER,
        home_penalty_score INTEGER,
        away_penalty_score INTEGER,
        half_time_home_score INTEGER,
        half_time_away_score INTEGER,
        man_of_the_match TEXT,
        summary_notes TEXT,
        notes TEXT,
        goals_json TEXT NOT NULL,
        cards_json TEXT NOT NULL,
        match_stats_json TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);

    global._sqliteDbInstance = db;
  }
  return global._sqliteDbInstance;
}

export const sqliteDb = getSqliteDatabase();
