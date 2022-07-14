import * as React from 'react';
//This SVG, as a React component, made with: https://transform.tools/
// here is full guide with other methods: https://frontend-digest.com/how-to-import-svgs-into-nextjs-8ec6100e613f
function walletPlusOutline(props) {
  return (
    <svg
      style={{
        width: 24,
        height: 24
      }}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="#FAFAFA"
        d="M3 0v3H0v2h3v3h2V5h3V3H5V0H3m7 3v2h9v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5v-9H3v9a2 2 0 002 2h14c1.1 0 2-.9 2-2v-2.28A2 2 0 0022 15V9a2 2 0 00-1-1.72V5c0-1.1-.9-2-2-2h-9m3 6h7v6h-7V9m3 1.5a1.5 1.5 0 00-1.5 1.5 1.5 1.5 0 001.5 1.5 1.5 1.5 0 001.5-1.5 1.5 1.5 0 00-1.5-1.5z"
      />
    </svg>
  );
}

export default walletPlusOutline;
