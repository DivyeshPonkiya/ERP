import {
  Access_Token,
  BaseUrl,
  asyncKeys,
  isNull,
  toastConst,
} from '../constants/constants';
import ToastMessage from '../components/ToastMessage';
import {strings} from '../localization';
import storage from '../storage';

export default class Index {
  endPoint: string;

  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  // Build final URL with query parameters
  private async buildUrl(params?: object) {
    const query = params
      ? '?' +
        Object.entries(params)
          .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
          .join('&')
      : '';
    return `${BaseUrl}/${this.endPoint}${query}`;
  }

  // Common headers with token
  private async getHeaders(contentType = 'application/json') {
    const token = await storage.getString(asyncKeys.accessToken);

    return {
      Accept: 'application/json',
      'Content-Type': contentType,
      Authorization: token ? `Bearer ${token}` : `Bearer ${Access_Token}`,
    };
  }

  // Shared error handler
  private async handleResponse(response: Response) {
    let statusCode = response.status;
    const responseJSON = await response.json();

    if (response.ok == false) {
      if (statusCode === 401) {
        ToastMessage.set(
          toastConst.errorToast,
          responseJSON?.message ??
            responseJSON?.error ??
            strings.not_authorized_user,
        );
      } else {
        if (responseJSON?.errors) {
          var keys = Object.values(responseJSON?.errors);
          var dataString = keys.toString();
          ToastMessage.set(
            toastConst.errorToast,
            dataString || strings.somethingWent,
          );
        } else {
          let errorMessage =
            responseJSON?.message ??
            responseJSON?.error ??
            strings.somethingWent;
          ToastMessage.set(toastConst.errorToast, errorMessage);
        }
        statusCode = 501;
      }
      throw `${statusCode}`;
    }
    return {statusCode, ...responseJSON};
  }

  async get(params?: object) {
    const url = await this.buildUrl(params);
    const headers: any = await this.getHeaders();
    const response = await fetch(url, {method: 'GET', headers});
    return this.handleResponse(response).catch(e => {
      throw e ? `${e}` : `501`;
    });
  }

  async post(params?: any, outerFormData?: any) {
    const url = await this.buildUrl();

    const headers: any = await this.getHeaders('multipart/form-data');

    const formData = new FormData();
    if (!isNull(params)) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: !isNull(outerFormData)
        ? outerFormData
        : !isNull(params)
        ? formData
        : null,
    });

    return this.handleResponse(response).catch(e => {
      throw e ? `${e}` : `501`;
    });
  }

  async postRaw(params?: any) {
    const url = await this.buildUrl();
    const headers: any = await this.getHeaders();
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(params),
    });
    return this.handleResponse(response);
  }

  async put(params?: any) {
    const url = await this.buildUrl();
    const headers: any = await this.getHeaders(
      'application/x-www-form-urlencoded',
    );
    const formBody = new URLSearchParams(params).toString();

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: formBody,
    });
    return this.handleResponse(response);
  }

  async putRaw(params?: any) {
    const url = await this.buildUrl();
    const headers: any = await this.getHeaders();
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(params),
    });
    return this.handleResponse(response);
  }

  async patch(params?: any, outerFormData?: any) {
    const url = await this.buildUrl(params);
    const headers: any = await this.getHeaders('multipart/form-data');

    const formData = new FormData();
    if (!isNull(params)) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });
    }

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: !isNull(outerFormData)
        ? outerFormData
        : !isNull(params)
        ? formData
        : null,
    });

    return this.handleResponse(response);
  }

  async patchWithOutParams(params?: any) {
    const url = await this.buildUrl();
    const headers: any = await this.getHeaders('multipart/form-data');

    const formData = new FormData();
    if (!isNull(params)) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });
    }

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: !isNull(params) ? formData : null,
    });

    return this.handleResponse(response);
  }

  async delete(params?: any) {
    const url = await this.buildUrl();
    const headers: any = await this.getHeaders(
      'application/x-www-form-urlencoded',
    );
    const formBody = new URLSearchParams(params).toString();

    const response = await fetch(url, {
      method: 'DELETE',
      headers,
      body: formBody,
    });
    return this.handleResponse(response);
  }
}
