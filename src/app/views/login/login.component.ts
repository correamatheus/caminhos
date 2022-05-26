import { AutenticacaoService } from './service/autenticacao.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faArrowRight,
  faRightLong,
  faUser,
  faKey,
} from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() onLogin = new EventEmitter<boolean>(false);
  isLogging: boolean = false;
  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) {}
  loginForm: FormGroup = new FormGroup({});

  //FONT AWSOME
  faArrowRight = faArrowRight;
  faRightLong = faRightLong;
  faUser = faUser;
  faKey = faKey;

  ngOnInit(): void {
    this.loginForm.addControl(
      'email',
      new FormControl('', [Validators.required, Validators.email])
    );
    this.loginForm.addControl(
      'senha',
      new FormControl('', [Validators.required])
    );
  }

  login(): void {
    this.autenticacaoService
      .signIn(
        this.loginForm.get('email')?.value,
        this.loginForm.get('senha')?.value
      )
      .pipe(finalize(() => (this.isLogging = false)))
      .subscribe(
        (_) => {
          this.onLogin.emit(true);
          this.router.navigate(['/dashboard']);
        },
        (_) => this.onLogin.emit(false)
      );
  }
}
