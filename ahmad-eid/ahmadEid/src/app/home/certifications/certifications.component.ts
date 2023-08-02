import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Certification } from 'src/app/core/domin/certification';
import { collection, getDocs } from 'firebase/firestore';
import { database } from 'src/app/app.module';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export class CertificationsComponent {
  collectionRef = collection(database, 'certifications');
  public iCertification: Certification = {
    id: 0,
    certificationName: '',
    certificationDescription: '',
    certificationImage: '',
    certificationType: '',
    certificationURL: '',
    userName: '',
    certificationImageFile: undefined
  }
  dataLoaded: boolean = false;
  certifications: Certification[] = [];
  certificationType: Certification[] = [];
  course: Certification[] = [];
  
  getdata() {
    this.certifications = [];
    getDocs(this.collectionRef)
      .then((res) => {
        const certificationsData = res.docs.map((item) => {
          return { ...item.data(), id: item.id } as unknown; 
        });
        this.certificationType = [];
        this.course = [];
       
        certificationsData.forEach((certificationData) => {
          const certification = certificationData as Certification; 
          this.certifications.push(certification);
          this.dataLoaded = true;
          // switch (certification.certificationType) {
          //   case 'Certification':
          //     this.dataLoaded = true;
          //     this.certificationType.push(certification);
          //     break;
          //   case 'Course':
          //     this.course.push(certification);
          //     break;
          //   default:
          //     break;
          // }
        });
      })
      .catch((err) => {
        alert(err);
      });
  }
  
  
ngOnInit() {
  setTimeout(() => {
  this.getdata();
  }, 200);
}
}
