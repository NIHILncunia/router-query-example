import 'twin.macro';
import { css as cssImport } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';
import styledImport from '@emotion/styled';

declare module 'twin.macro' {
  // The styled and css imports
  // eslint-disable-next-line no-unused-vars
  const styled: typeof styledImport;
  // eslint-disable-next-line no-unused-vars
  const css: typeof cssImport;
}

declare module 'react' {
  // The css prop
  // eslint-disable-next-line no-unused-vars
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSInterpolation
  }
  // The inline svg css prop
  // eslint-disable-next-line no-unused-vars
  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSInterpolation
  }
}
