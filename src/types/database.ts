// Minimal typed surface for the Supabase client. Kept intentionally loose
// (Row = Partial-friendly) so the generated types don't need to be regenerated
// every time a column is added via the SQL editor.
export interface Database {
  public: {
    Tables: {
      [key: string]: {
        Row: Record<string, any>
        Insert: Record<string, any>
        Update: Record<string, any>
      }
    }
  }
}
