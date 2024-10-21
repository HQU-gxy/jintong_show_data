import service from '../http/request'
import { Result } from '../model/entity'

export function getData(data: unknown) {
  return service.get<any, Result>('/getData', {
    params: data
  })
}
