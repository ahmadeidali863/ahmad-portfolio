export interface GiftPageCustomization {
    id: string;
    backgroundColor: string;
    theme: string;
    backgroundPattern: string;
    pageActionRelated: string;
    pageHeader: string;
    pageFooter: string;
    pageDescription: string;
    textColor: string;
    textFont: string;
    textSize: string;
    music: string;
    actions: PageAction[];
  }

  export interface PageAction {
    pageId: string;
    pageName: string;
    buttons: Button[];
    pageIsOpened: boolean;
  }
  
  export interface Button {
    buttonName: string;
    buttonOrder: number;
    buttonBackground: string;
    actionType: string;
    buttonTheme: string;
    buttonFont: string;
    buttonColor: string;
    buttonSize: string;
  }