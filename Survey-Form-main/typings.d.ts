interface SectionProps {
    title: string;
    children: React.ReactNode;
  }
  interface BenefitItemProps {
    title: string;
    description: string;
    image: string;
  }
  interface FeatureItemProps {
    title: string;
    description?: string;
    image: string;
  }
  
  interface Question {
    question: string;
    type: "text" | "email" | "tel";
    options: string[];
  };
  
  // Answers type
  interface Answers  {
    [key: number]: string;
  };

  interface SurveyData {
    isOnlineExperienceRuined: boolean;
    willChooseUbacco: boolean;
    revolutionaryShoppingExperience: string;
    shoppingFrequency: string;
    favoriteBrand: string;
    annualSpending: number;
    name: string;
    email: string;
    phoneNumber: string;
  }

  interface SurveyAnswers {
    0: string; // isOnlineExperienceRuined
    1: string; // willChooseUbacco
    2: string; // revolutionaryShoppingExperience
    3: string; // shoppingFrequency
    4: string; // favoriteBrand
    5: string; // annualSpending
    6: string; // name
    7: string; // email
    8: string; // phoneNumber
  }
  