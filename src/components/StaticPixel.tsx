import React from 'react';

const StaticPixel: React.FC<any> = ({ color }) => {
	return <span className={`static ${color}`}></span>;
};

export default StaticPixel;
