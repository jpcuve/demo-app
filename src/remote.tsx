const BASE_URL = window.location.port === '3000' ? 'http://localhost:8080' : `${window.location.protocol}//${window.location.host}`
console.debug(`Base URL for RPC: ${BASE_URL}`)

const client: any = {
  rpc: async function (endPoint: string, method: string = 'GET', contentType: string = '', body: any | null = null ): Promise<any> {
    const options: any = {
      method,
      headers: {
        'Accept': 'application/json',
        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKb2UiLCJyb2xlcyI6ImEsYixjIn0.E89yUJXwD41GWgYKIzC8Kb6AHCss2nUVcKVNqa1MsXI',
      },
      // credentials: 'include',
    };
    const accessToken = localStorage.getItem('TOKEN') || ''
    if (accessToken){
      options.headers['Authorization'] = `Bearer ${accessToken}`
      options.credentials = 'include'
    }
    if (body){
      if (contentType){
        options.headers['Content-Type'] = contentType
      }
      options.body = body;
    }
    // console.debug(JSON.stringify(options))
    const res = await fetch(`${BASE_URL}${endPoint}`, options)
    if (!res.ok){
      throw Error(`Http error: ${res.status} ${res.statusText}`)
    }
    const json = await res.json()
    // console.debug(JSON.stringify(json))
    if ('error' in json) {
      throw Error(json.error)
    }
    return json;
  },
  get: async function(endPoint: string): Promise<any> { 
    return await this.rpc(endPoint)
  } ,
  post: async function(endPoint: string, data: any): Promise<any> { 
    return await this.rpc(endPoint, 'POST', 'application/json', JSON.stringify(data))
  },
  postForm: async function(endPoint: string, form: FormData): Promise<any> { 
    return await this.rpc(endPoint, 'POST', undefined, form)
  },  // contentType: undefined so boundary is correctly set
  put: async function(endPoint: string, data: any): Promise<any> { 
    return await this.rpc(endPoint, 'PUT', 'application/json', JSON.stringify(data))
  },
  delete: async function(endPoint: string): Promise<any> { 
    return await this.rpc(endPoint, 'DELETE')
  }
}

export default client

