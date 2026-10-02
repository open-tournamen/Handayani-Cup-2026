-- 1. TABEL USERS (Integrasi Firebase Auth / Internal)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    uid TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABEL TOURNAMENT CONFIGS
CREATE TABLE IF NOT EXISTS tournament_configs (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    edition TEXT NOT NULL,
    category TEXT NOT NULL,
    max_age_limit INTEGER NOT NULL,
    min_age_limit INTEGER NOT NULL,
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
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABEL TEAMS
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
    officials_json TEXT NOT NULL DEFAULT '[]',
    players_json TEXT NOT NULL DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABEL MATCHES
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
    goals_json TEXT NOT NULL DEFAULT '[]',
    cards_json TEXT NOT NULL DEFAULT '[]',
    match_stats_json TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABEL TOURNAMENT NEWS
CREATE TABLE IF NOT EXISTS tournament_news (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    author TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT,
    image_url TEXT NOT NULL,
    tag TEXT,
    read_time TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. TABEL TOURNAMENT DOCUMENTS
CREATE TABLE IF NOT EXISTS tournament_documents (
    id TEXT PRIMARY KEY,
    team_id TEXT,
    team_name TEXT,
    player_id TEXT,
    player_name TEXT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT,
    file_size_kb INTEGER,
    storage_provider TEXT NOT NULL DEFAULT 'supabase',
    verification_status TEXT NOT NULL DEFAULT 'verified',
    uploaded_by TEXT NOT NULL DEFAULT 'Panitia / Admin',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);