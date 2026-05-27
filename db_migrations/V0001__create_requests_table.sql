CREATE TABLE IF NOT EXISTS t_p98723611_yoga_event_site.requests (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    type TEXT NOT NULL,
    date TEXT,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);