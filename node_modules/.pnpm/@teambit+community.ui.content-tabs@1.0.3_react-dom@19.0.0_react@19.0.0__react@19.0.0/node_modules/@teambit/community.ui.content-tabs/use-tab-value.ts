import { useState } from 'react';

const isTopAccessible = () => {
  try {
    window.top?.location.host;
    return true;
  } catch (err) {
    return false;
  }
};

const getLocationInfo = () => {
  const fullPath = window.top!.location.href;
  const base = fullPath!.split('?')[0];
  const params = fullPath!.split('?')[1] ?? '';
  return { base, params };
};

export const useTabValue = (urlParam: string | undefined) => {
  const canUseParams = urlParam && isTopAccessible();
  const defaultValue =
    canUseParams && getLocationInfo().params.includes(urlParam)
      ? parseInt(
          new URLSearchParams(`?${getLocationInfo().params}`).get(urlParam)!
        )
      : 0;
  const [value, setValue] = useState(defaultValue);
  const setParamValue = (index: number) => {
    setValue(index);
    if (!canUseParams) return;
    const searchParams = new URLSearchParams(`?${getLocationInfo().params}`);
    searchParams.set(urlParam, index.toString());
    window.top!.history.pushState(
      {},
      '',
      `${getLocationInfo().base}?${searchParams.toString().replace('=&', '&')}`
    );
  };
  return { activeTab: value, setActiveTab: setParamValue };
};
