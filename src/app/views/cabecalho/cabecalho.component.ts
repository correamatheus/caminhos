import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../login/service/autenticacao.service';
import {
  faUser,
  faArrowRightFromBracket,
  faGear
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  faUser= faUser;
  faArrowRightFromBracket = faArrowRightFromBracket;
  faUserGear = faGear;

  constructor(  private autenticacaoService: AutenticacaoService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.autenticacaoService.signOut();
    this.router.navigate(['/']);
  }
}
