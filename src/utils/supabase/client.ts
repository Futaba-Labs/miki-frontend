import {
  createClient,
  SupabaseClient
} from '@supabase/supabase-js'
import { env } from '../config'

const client: SupabaseClient = createClient(env.SUPABASE_URL, env.SUPABASE_API_KEY)

const createSupabase = () => client

export default createSupabase
