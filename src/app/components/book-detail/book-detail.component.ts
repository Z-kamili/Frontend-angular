import { Component, OnInit, NgZone } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  getId:any;
  updateForm: FormGroup;


  constructor(
    public formBiulder: FormBuilder,
    private router: Router,
    private activateRout: ActivatedRoute,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.getId = this.activateRout.snapshot.paramMap.get('id');
    this.crudService.getBook(this.getId).subscribe(res=>{
    console.log(res['book']);
      this.updateForm.setValue({
        name: res['book']['name'],
        price: res['book']['price'],
        description: res['book']['description'],
      });
    });

    this.updateForm = this.formBiulder.group({
      name: [''],
      price: [''],
      description: [''],
    })
   }

  ngOnInit(): void {
  }

  onUpdate(): any {
    this.crudService.updateBook(this.getId,this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully')
        this.ngZone.run(() => this.router.navigateByUrl('/books-list'))
      }, (err) => {
        console.log(err)
      })
  }

}
