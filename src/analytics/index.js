import ReactGA from 'react-ga4';

export const sendAnalytics = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
    value: 1,
    nonInteraction: true,
    transport: 'xhr',
  });
};
