import axios from 'axios'

axios.defaults.baseURL = import.meta.env.NUXT_PUBLIC_API_URL
axios.defaults.headers.common['Content-Type'] = 'application/json'

export default axios
