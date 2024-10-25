export interface Device {

}

export interface Result {
    code: number
    msg: string
    data: any
}


export interface DataCell {
    lable: string;
    value?: string;
    timestamp?: string;
    data_type: number;
    max_size: number;
    name: string;
}

export interface GSM2GCellInfo {
    idx?: number,
    PLMN?: DataCell,
    Lac?: DataCell,
    Bsic?: DataCell,
    Arfcn?: DataCell,
    Rxlev?: DataCell,
}

export interface GSM3GCellInfo {
    idx?: number,
    PLMN?: DataCell,
    Lac?: DataCell,
    Bsic?: DataCell,
    CellID?: DataCell,
    Arfcn?: DataCell,
    Psc?: DataCell,
    Rscp?: DataCell,
    Ecno?: DataCell,
}

export interface GSM4GCellInfo {
    idx?: number,
    PLMN?: DataCell,
    CellID?: DataCell,
    pcid?: DataCell,
    Arfcn?: DataCell,
    Rsrp?: DataCell,
    Rsrq?: DataCell,
}

export interface NR5G4GCellInfo {
    idx?: number,
    PLMN?: DataCell,
    Band?: DataCell,
    Arfcn?: DataCell,
    Pcid?: DataCell,
    Rsrp?: DataCell,
    Rsrq?: DataCell,
    Sinr?: DataCell,
}

export interface WIFI_Cell_Info {
    idx?: number,
    CH?: DataCell,
    SSID?: DataCell,
    BSSID?: DataCell,
    Indicator?: DataCell,
}
