export type Customer = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  streetaddress: string;
  postcode: string;
  city: string;
  _links: {
    self: { href: string };
    trainings?: { href: string };
  };
};

export type Training = {
  date: string;
  duration: number;
  activity: string;
  _links: {
    self: { href: string };
    customer: { href: string };
  };

  customer?: {
    firstname: string;
    lastname: string;
  }
};

export interface ChartProps {
  data: Training[];      
  yKey: string;     
  barColor?: string; 
}
