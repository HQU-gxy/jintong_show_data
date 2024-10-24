import service from '../http/request'
import { Result } from '../model/entity'

export function getData(data: unknown) {
  return service.post<any, Array<any>>('/stations/equipDataList', {
    params: data
  })
}
