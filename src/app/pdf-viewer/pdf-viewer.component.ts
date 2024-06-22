import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {
  pdfSrc: SafeResourceUrl = '';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const pdfData = localStorage.getItem('tablePdf');
    if (pdfData) {
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(pdfData);
    }
  }
  
}
