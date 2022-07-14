import * as React from 'react';

//This SVG, as a React component, made with: https://transform.tools/
// here is full guide with other methods: https://frontend-digest.com/how-to-import-svgs-into-nextjs-8ec6100e613f
function walletOutline(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="#FAFAFA"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-2.28A2 2 0 0022 15V9a2 2 0 00-1-1.72V5a2 2 0 00-2-2H5m0 2h14v2h-6a2 2 0 00-2 2v6a2 2 0 002 2h6v2H5V5m8 4h7v6h-7V9m3 1.5a1.5 1.5 0 00-1.5 1.5 1.5 1.5 0 001.5 1.5 1.5 1.5 0 001.5-1.5 1.5 1.5 0 00-1.5-1.5z" />
    </svg>
  );
}

export default walletOutline;
