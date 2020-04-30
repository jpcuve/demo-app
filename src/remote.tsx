const BASE_URL = window.location.port === '3000' ? 'http://localhost:8080' : `${window.location.protocol}//${window.location.host}`
console.log(`Base URL for RPC: ${BASE_URL}`)

const client: any = {
  rpc: async function (endPoint: string, method: string = 'GET', contentType: string = '', body: any | null = null ): Promise<any> {
    const options: any = {
      method,
      headers: {
        'Accept': 'application/json',
      },
      // credentials: 'include',
    };
    if (body){
      if (contentType){
        options.headers['Content-Type'] = contentType
      }
      options.body = body;
    }
    console.log(JSON.stringify(options))
    const res = await fetch(`${BASE_URL}${endPoint}`, options)
    const json = await res.json()
    console.log(JSON.stringify(json))
    if ('error' in json) {
      throw json.error;
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

