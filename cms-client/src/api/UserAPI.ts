import axios, { AxiosRequestConfig } from "axios";
const baseURl = process.env.NEXT_PUBLIC_BASEURL;

export function INITIALISE_USER(
  displayName: string,
  email: string,
  photoURL: string
) {
  const config: AxiosRequestConfig = {
    method: "post",
    url: `${baseURl}/user/initialise`,
    data: {
      displayName: displayName,
      email: email,
      photoURL: photoURL,
    },
  };
  return axios(config);
}
