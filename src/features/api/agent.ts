import axios, { AxiosResponse } from "axios";

// axios.defaults.baseURL ="https://b4bf-202-28-123-199.ngrok-free.app/api/";
axios.defaults.baseURL ="http://10.103.0.30/cs64/s13/ProjectRestaurant/";

//UrlForMyOrderScreen(product)
export const UrlFolderOrderImage = "http://10.103.0.30/cs64/s13/ProjectRestaurant/orderImage/";
export const UrlImages = "http://10.103.0.30/cs64/s13/ProjectRestaurant/images/";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, params: {}) => axios.post(url, params).then(responseBody),
  put: (url: string, params: {}) => axios.put(url, params).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) =>
    axios
      .post(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
  putForm: (url: string, data: FormData) =>
    axios
      .put(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
};

const Product = {
  getproduct: (values: any) => requests.get("api/Product/Get", values),
  getType: (values: any) => requests.get("api/Product/GetTypes", values),
  getproductNoConvert: () => requests.get("/api/Product/GetProductNoConvert"),
  // getproduct: (values: any) => requests.get("api/Product/GetProductNoConvert", values),

};

const Account = {
  login: (values: any) => requests.post("api/Authentication/Login", values),
  register: (values: any) => requests.post("api/Authentication/Register", values),
  confirm: (values: any) =>requests.post("api/Authentication/ConfirmEmail", values),
  createaddress : (values: any) => requests.post("api/Authentication/CreateAddress", values),
  getaddress : (values: any) => requests.post("api/Authentication/PostUserAddress", values),
  changeusername : (values: any) => requests.post("api/Authentication/ChangeUserName", values),
  changeemail : (values: any) => requests.post("api/Authentication/ChangeEmail", values),
  changepassword : (values: any) => requests.post("api/Authentication/ChangePassword", values),
  deleteUser: (values: any) => requests.post("api/Authentication/DeleteUser",values),
  getSingleUser : (values: any) => requests.post("api/Authentication/GetSingleUser", values),
  resendEmail : (values: any) => requests.post("api/Authentication/ResendConfirmEmail", values),
  ResetForgotPassword : (values: any) => requests.post("api/Authentication/ResendConfirmForgotPassword", values),
  SendMessageToForgotPassword : (values: any) => requests.post("api/Authentication/SendMessageToForgotPassword", values),
  ConfirmOTPForgotPassword : (values: any) => requests.post("api/Authentication/ConfirmEmailToForgotPassword", values),
  CreateNewPassword : (values: any) => requests.post("api/Authentication/ForgetPassword",values),
  AddProfile : (values: any) => requests.postForm("api/Authentication/UploadProfileImage",createFormData(values)),
};

const CartUser = {
  AddItem: (values: any) => requests.post("/api/CartUser/AddItemToCart", values),
  DeleteItem: (values: any) =>
    requests.post("/api/CartUser/DeleteItemToCart", values),
  // getCart: (values: any) => requests.get(`CartUser/GetCartByUsername?username=${values.username}`, values),
  getCart: (values: any) => requests.post("/api/CartUser/GetCartByUsername", values),
  DeleteItemAll: (values: any) => requests.post("/api/CartUser/DeleteItemToCartall", values),
};

  // แปลงจากข้อมูลที่ส่งมาเป็น Forms เพื่อให้ตรงกับใน Backend เพราะ Backend เป็น FromForm Start

function createFormData(item: any) {
  let formData = new FormData();
  for (const key in item) {
      formData.append(key, item[key])
  }
  return formData;
}

// CreateOrder: (values: any) => requests.postForm("CartUser/CreateOrder",createFormData(values)),
// แปลงจากข้อมูลที่ส่งมาเป็น Forms เพื่อส่งไปใน Backend End


const OrderUser = {
  CreateOrder: (values: any) => requests.postForm("/api/CartUser/CreateOrder",createFormData(values)),
  GetShowOrderUser: (values: any) => requests.post("/api/Order/GetOrdersByUsername",values),
  GetOrderByUserId : (values: any) => requests.post("/api/Order/GetOrderByUserId",values),
  UpdateOrderStatus : (values: any) => requests.post("/api/Order/UpdateOrderStatus",values),
}

const ReviewUser = {
  AddReviewUser: (values: any, formFiles: any) => {
    let formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    for (const file of formFiles) {
      formData.append("FormFiles", file);
    }
    // of คือเนื้อใน in คือข้างใน
    return requests.postForm("/api/Review/AddProductComment", formData);
  },

  // ที่ต้องที่แบบนี้เพราะรูปที่ส่งมาเป็น 1 FormFiles ซึ่งเป็นlist "ข้างในจะมีหลายรูป" มาจะส่งไม่ได้ 
  // ต้องทำการแยกมาเป็น 1 FormFiles ต่อ หนึ่งภาพ ให้ดูที่เมื่อทำการ Review ตรง Curl ข้างบน Request URL
  // ดังตัวอย่าง
  // 'FormFiles=@364198792_839343014425091_7532241539389896409_n.jpg;type=image/jpeg' \
  // 'FormFiles=@meal-transparent-images-pluspng-food-11563209879nmglwvhrsl-removebg-preview.png;type=image/png'

  GetReviewUserById: (values: any) =>
    requests.post("/api/Review/GetProductReviewsId", values),
};

const agent = {
  Product,
  Account,
  CartUser,
  OrderUser,
  ReviewUser,
  UrlFolderOrderImage,
  UrlImages,
};

export default agent;
