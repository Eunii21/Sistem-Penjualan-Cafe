import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xoqgeshwrpdgboisvdmf.supabase.co/rest/v1/"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvcWdlc2h3cnBkZ2JvaXN2ZG1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MTcwMjgsImV4cCI6MjA5NTA5MzAyOH0.qh67SwG7aJ1B2SPOCeUv8gMjhNYoukybcBF-QTvrwus"

export const supabase = createClient(supabaseUrl, supabaseKey);