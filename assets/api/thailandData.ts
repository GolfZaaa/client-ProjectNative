interface Tambon {
  id: number;
  zip_code: ZipCode[];
  name_th: string;
  name_en: string;
  amphure_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface ZipCode {
  id: number;
zip_code: number;
  name_th: string;
  name_en: string;
  geography_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  amphure: Amphure[];
}


  
  interface Amphure {
    id: number;
    name_th: string;
    name_en: string;
    province_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    tambon: Tambon[];
    zipCode: ZipCode[];
  }


  interface Province {
    id: number;
    name_th: string;
    name_en: string;
    geography_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    amphure: Amphure[];
    tambon: Tambon[]; 
  }
  
  export { Tambon, Amphure, Province, ZipCode };
  