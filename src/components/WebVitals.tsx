'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case 'CLS':
        console.log('CLS:', metric.value)
        break
      case 'FID':
        console.log('FID:', metric.value)
        break
      case 'FCP':
        console.log('FCP:', metric.value)
        break
      case 'LCP':
        console.log('LCP:', metric.value)
        break
      case 'TTFB':
        console.log('TTFB:', metric.value)
        break
      default:
        break
    }
  })

  return null
}

// const reportWebVitals = onPerfEntry => {
//    if (onPerfEntry && onPerfEntry instanceof Function) {
//      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
//        getCLS(onPerfEntry);
//        getFID(onPerfEntry);
//        getFCP(onPerfEntry);
//        getLCP(onPerfEntry);
//        getTTFB(onPerfEntry);
//      });
//    }
//  };

//  export default reportWebVitals;
