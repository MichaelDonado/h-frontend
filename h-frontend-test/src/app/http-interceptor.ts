import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthorIdInterceptor implements HttpInterceptor {
  private authorIdHeaderValue = environment.authorId;// Reemplaza con el valor correcto

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const headers = new HttpHeaders().set('authorId', this.authorIdHeaderValue);
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
