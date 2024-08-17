export interface ViewPage {
    customization: Customization;
    actions: Action;
  }

  export interface Customization {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    fontSize: string; // e.g., '16px', '1em'
    boxColor: string;
    boxBorderColor: string;
    backgroundImage: string; // URL of the background image
    musicFile: File | null; // For music files
  }

  export interface Action {
    id: number; // Unique identifier for the action
    label: string; // Label or text displayed on the box
    actionType: 'playMusic' | 'showMessage'; // Type of action
    musicFile?: File; // Optional music file for the 'playMusic' action
    message?: string; // Optional message for the 'showMessage' action
  }