import service from '../http/request'
import {DataCell, Result} from '../model/entity'

export function getData(stationNo: string, deviceNo: string, ) {
  return service.post<any, Array<DataCell>>(`/stations/equipDataList?tableCategory=2&stationNo=${stationNo}&deviceNo=${deviceNo}`, {})
}
