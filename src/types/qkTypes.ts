export interface OperationType {
  address: AddressType;
  closed: boolean;
  devices: Array<string>;
  endOfDay: string;
  name: string;
  id: string;
  operationId: string;
  employeeRoster: Array<EmployeeType>;
  shifts: Array<ShiftsType>;
  stations: Array<string>;
}

export interface AddressType {
  city: string;
  state: string;
  street: string;
  zip: string;
}

export interface EmployeeType {
  code: string;
  emailAddress: string;
  firstName: string;
  fullName: string;
  id: string;
  initials: string;
  isManager: boolean;
  lastName: string;
  operationId: string;
  phoneNumber: string;
  role: string;
}

export interface ShiftsType {
  name: string;
  startTime: string;
  endTime: string;
  id: string;
  operationId: string;
}

export interface TaskType {
  amount?: string;
  assignedEmployees: EmployeeType[];
  description: string;
  due: string;
  finishedBy?: EmployeeType;
  finishedOn?: string;
  highTemp?: string;
  id: string;
  lowTemp?: string;
  operationId: string;
  severity: string;
  shift: string;
  spec?: string;
  station: string;
  status: string;
  temperatureReading?: string;
  type: string;
  unit?: string;
}

export interface TaskGroup {
  station: string;
  shift: string;
  assignedEmployees?: EmployeeType[];
  taskIds: string[];
  total: number;
  inprogress: {
    total: number;
    taksIds: string[];
  }
  unassigned: {
    total: number;
    taksIds: string[];
  }
  completed: {
    total: number;
    taksIds: string[];
  }
  flagged: {
    total: number;
    taksIds: string[];
  }
  pastdue: {
    total: number;
    taksIds: string[];
  }
}
