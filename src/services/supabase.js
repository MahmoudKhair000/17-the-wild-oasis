import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hrqxtwqgkuljmyfbiohl.supabase.co';

const supabaseKey = 'sb_publishable_urc9InKGZemnJgUGy_CZWw_QtM6O3EX';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;