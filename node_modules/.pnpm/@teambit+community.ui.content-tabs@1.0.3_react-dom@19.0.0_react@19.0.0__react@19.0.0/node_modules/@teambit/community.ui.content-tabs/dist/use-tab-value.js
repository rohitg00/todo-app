import { useState } from 'react';
const isTopAccessible = () => {
    var _a;
    try {
        (_a = window.top) === null || _a === void 0 ? void 0 : _a.location.host;
        return true;
    }
    catch (err) {
        return false;
    }
};
const getLocationInfo = () => {
    var _a;
    const fullPath = window.top.location.href;
    const base = fullPath.split('?')[0];
    const params = (_a = fullPath.split('?')[1]) !== null && _a !== void 0 ? _a : '';
    return { base, params };
};
export const useTabValue = (urlParam) => {
    const canUseParams = urlParam && isTopAccessible();
    const defaultValue = canUseParams && getLocationInfo().params.includes(urlParam)
        ? parseInt(new URLSearchParams(`?${getLocationInfo().params}`).get(urlParam))
        : 0;
    const [value, setValue] = useState(defaultValue);
    const setParamValue = (index) => {
        setValue(index);
        if (!canUseParams)
            return;
        const searchParams = new URLSearchParams(`?${getLocationInfo().params}`);
        searchParams.set(urlParam, index.toString());
        window.top.history.pushState({}, '', `${getLocationInfo().base}?${searchParams.toString().replace('=&', '&')}`);
    };
    return { activeTab: value, setActiveTab: setParamValue };
};
//# sourceMappingURL=use-tab-value.js.map