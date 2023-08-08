import { orderContant } from "./contants";

export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (e) {
    return false;
  }
  return true;
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

//type product
export const renderOptions = (arr) => {
  let result = [];
  if (arr) {
    result = arr?.map((opt) => {
      return {
        value: opt,
        label: opt,
      };
    });
  }
  result.push({
    label: "Thêm loại",
    value: "add-type",
  });
  return result;
};

export const convertPrice = (price) => {
  try {
    const result = price?.toLocaleString().replace(",", ".");
    return `${result} VNĐ`;
  } catch (err) {
    return err.toString();
  }
};

export const initFacebookSDK = () => {
  if (window.FB) {
    window.FB.XFBML.parse();
  }
  let locale = "vi_VN";
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: process.env.REACT_APP_FB_ID, // You App ID
      autoLogAppEvents: true,
      xfbml: true,
      version: "v17.0",
    });
  };
  // Load the SDK asynchronously
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = `//connect.facebook.net/${locale}/sdk.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};

export const convertDataChart = (data, type) => {
  try {
    const object = {};
    Array.isArray(data) &&
      data.forEach((opt) => {
        if (!object[opt[type]]) {
          object[opt[type]] = 1;
        } else {
          object[opt[type]] += 1;
        }
      });
    const results =
      Array.isArray(Object.keys(object)) &&
      Object.keys(object).map((item) => {
        return {
          name: orderContant.payment[item],
          value: object[item],
        };
      });
    return results;
  } catch (e) {
    return [];
  }
};
