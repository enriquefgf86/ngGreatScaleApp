import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const baseUrl = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class UploadsFilesService {
  constructor() {}

  async updatePhoteProfile(
    archive: File, //esto es propio de javascript
    types: 'users' | 'doctors' | 'hospitals',
    id: String
  ) {
    try {
      const url = `${baseUrl}/upload/${types}/${id}`;
      const data = new FormData(); // este elemento es propio de javascriupt

      data.append('img', archive);

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'user-token': localStorage.getItem('token'),
        },
        body: data,
      });

      const bodyData = await response.json();
      console.log(bodyData);

      if (bodyData) {
        return bodyData.archiveStoredName;
      } else {
        console.log(bodyData.msg);

        return false;
      }

      console.log(response);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
