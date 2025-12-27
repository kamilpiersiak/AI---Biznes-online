
import React from 'react';
import { Package, Parameter } from './types';

export const PROMPT_TEMPLATE = `Ultra-realistyczne, profesjonalne zdjęcie biznesowe wygenerowane na podstawie dostarczonego obrazu referencyjnego. Zachowaj dokładne podobieństwo twarzy i cech charakterystycznych osoby, ale zmień całe otoczenie i styl na profesjonalny portrait.

SZCZEGÓŁOWA SPECYFIKACJA:
1. PERSPEKTYWA: [PERSPEKTYWA]
2. ŚWIATŁO: [ŚWIATŁO]
3. TWARZ: [TWARZ]
4. SYLWETKA: [SYLWETKA]
5. UBRANIA: [UBRANIA]
6. SZCZEGÓŁY: [SZCZEGÓŁY]
7. TŁO: [TŁO]
8. ATMOSFERA: [ATMOSFERA]
9. GŁĘBIA OSTROŚCI: [GŁĘBIA_OSTROŚCI]
10. KOLORYSTYKA: [KOLORYSTYKA]
11. CERA: [CERA]
12. WŁOSY: [WŁOSY]
13. REKWIZYTY: [REKWIZYTY]
14. JAKOŚĆ: [JAKOŚĆ]
15. OBIEKTYW: [OBIEKTYW]
16. POZYCJA RĄK: [POZYCJA_RĄK]
17. KĄT: [KĄT]
18. MAKIJAŻ: [MAKIJAŻ]
19. CIEŃ: [CIEŃ]
20. STYL: [STYL]

Wymagany efekt: Fotorealizm, 8k resolution, cinematic lighting, professional photography, high-end business session appearance.`;

export const DEFAULT_PARAMETERS: Parameter[] = [
  { id: 'PERSPEKTYWA', label: 'Perspektywa / Kadr', value: 'od przodu - frontalnie na wysokości głowy', placeholder: 'np. portret od pasa w górę' },
  { id: 'ŚWIATŁO', label: 'Światło', value: 'jasne zimne białe światło jak na sesji fotograficznej', placeholder: 'np. miękkie światło zachodzącego słońca' },
  { id: 'TWARZ', label: 'Wyraz Twarzy', value: 'uśmiechnięta, szczery szeroki uśmiech', placeholder: 'np. poważny, profesjonalny wyraz' },
  { id: 'SYLWETKA', label: 'Sylwetka', value: 'wyprostowana, pewna siebie postawa', placeholder: 'np. lekko zwrócona w bok' },
  { id: 'UBRANIA', label: 'Ubrania', value: 'elegancki dopasowany garnitur / żakiet granatowy', placeholder: 'np. biała koszula, styl smart-casual' },
  { id: 'SZCZEGÓŁY', label: 'Szczegóły', value: 'wysoka tekstura materiałów, detale guzików', placeholder: 'np. widoczna struktura lnianej koszuli' },
  { id: 'TŁO', label: 'Tło', value: 'nowoczesne jasne biurowiec z przeszkleniami', placeholder: 'np. jednolita szarość, studio' },
  { id: 'ATMOSFERA', label: 'Atmosfera', value: 'profesjonalizm, sukces, zaufanie', placeholder: 'np. kreatywna, dynamiczna' },
  { id: 'GŁĘBIA_OSTROŚCI', label: 'Głębia Ostrości', value: 'rozmyte tło (bokeh), ostrość na oczach', placeholder: 'np. cała postać ostra' },
  { id: 'KOLORYSTYKA', label: 'Kolorystyka', value: 'naturalne barwy, stonowane kontrasty', placeholder: 'np. ciepłe odcienie, sepia' },
  { id: 'CERA', label: 'Cera', value: 'naturalna tekstura skóry, bez niedoskonałości', placeholder: 'np. delikatny blask' },
  { id: 'WŁOSY', label: 'Włosy', value: 'starannie ułożone, lśniące', placeholder: 'np. luźne fale' },
  { id: 'REKWIZYTY', label: 'Rekwizyty', value: 'brak', placeholder: 'np. trzymany tablet, kawa' },
  { id: 'JAKOŚĆ', label: 'Jakość', value: 'ultra HD, 8k, photorealistic', placeholder: 'np. film grain style' },
  { id: 'OBIEKTYW', label: 'Obiektyw', value: '85mm f/1.8 portrait lens', placeholder: 'np. 35mm wide angle' },
  { id: 'POZYCJA_RĄK', label: 'Pozycja Rąk', value: 'ręce wzdłuż tułowia lub skrzyżowane na klatce', placeholder: 'np. ręka przy brodzie' },
  { id: 'KĄT', label: 'Kąt Nachylenia', value: '0 stopni, prosto', placeholder: 'np. z dołu dla dominacji' },
  { id: 'MAKIJAŻ', label: 'Makijaż', value: 'delikatny biznesowy, matowy', placeholder: 'np. wyrazisty' },
  { id: 'CIEŃ', label: 'Cienie', value: 'subtelne cienie modelujące rysy twarzy', placeholder: 'np. dramatyczny chiaroscuro' },
  { id: 'STYL', label: 'Styl ogólny', value: 'Forbes magazine cover style', placeholder: 'np. minimalistyczny' },
];

export const PACKAGES: Package[] = [
  {
    id: 'business',
    name: 'Sesja Biznesowa',
    description: 'Eleganckie zdjęcia z różnych perspektyw do korporacyjnego użytku.',
    icon: '👔',
    defaultValues: {
      'PERSPEKTYWA': 'portret korporacyjny, popiersie',
      'TŁO': 'nowoczesne minimalistyczne biuro, glass facade',
      'UBRANIA': 'formalny garnitur / luksusowa garsonka',
      'STYL': 'High-end Corporate Session'
    }
  },
  {
    id: 'stationary',
    name: 'Biznes Stacjonarny',
    description: 'Dla przedsiębiorców prowadzących działalność lokalną.',
    icon: '🏢',
    defaultValues: {
      'TŁO': 'wnętrze gustownego gabinetu lub lokalu usługowego',
      'UBRANIA': 'smart casual, koszula premium',
      'ATMOSFERA': 'dostępność, profesjonalizm lokalny',
      'REKWIZYTY': 'atrybuty zawodu w tle'
    }
  },
  {
    id: 'online',
    name: 'Biznes Online',
    description: 'Idealne na strony WWW i do sklepów internetowych.',
    icon: '💻',
    defaultValues: {
      'TŁO': 'jasne, czyste, nowoczesne studio lub loft',
      'ATMOSFERA': 'nowoczesność, dynamizm',
      'PERSPEKTYWA': 'szeroki kadr z miejscem na tekst obok postaci',
      'STYL': 'Tech Startup Aesthetic'
    }
  },
  {
    id: 'marketing',
    name: 'Marketing / Hero',
    description: 'Zdjęcia na banery firmowe i sekcje typu Hero.',
    icon: '📣',
    defaultValues: {
      'PERSPEKTYWA': 'szeroki plan, postać z boku kadru',
      'GŁĘBIA_OSTROŚCI': 'mocny bokeh, filmowy look',
      'JAKOŚĆ': 'Advertising quality photography',
      'STYL': 'Commercial Billboard Style'
    }
  },
  {
    id: 'docs',
    name: 'Dokumenty / CV',
    description: 'Profesjonalne portrety do CV i dokumentów.',
    icon: '📄',
    defaultValues: {
      'TŁO': 'jednolite szare lub białe tło studyjne',
      'PERSPEKTYWA': 'zbliżenie na twarz (headshot)',
      'ŚWIATŁO': 'równomierne oświetlenie portretowe',
      'TWARZ': 'uprzejmy, lekki uśmiech'
    }
  },
  {
    id: 'social',
    name: 'Media Społecznościowe',
    description: 'Na profile Facebook, LinkedIn, TikTok.',
    icon: '📱',
    defaultValues: {
      'ATMOSFERA': 'autentyczność, energia, engagement',
      'KOLORYSTYKA': 'żywe, nasycone barwy',
      'STYL': 'Influencer / Personal Brand style',
      'UBRANIA': 'stylowy casual'
    }
  },
  {
    id: 'google',
    name: 'Google Moja Firma',
    description: 'Na wizytówkę Google i Mapy Google.',
    icon: '📍',
    defaultValues: {
      'TŁO': 'przed wejściem do firmy lub w recepcji',
      'ATMOSFERA': 'zapraszająca, godna zaufania',
      'ŚWIATŁO': 'naturalne dzienne',
      'STYL': 'Real Business Owner vibe'
    }
  }
];
