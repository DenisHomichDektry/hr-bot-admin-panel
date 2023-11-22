import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------
interface IRouterLinkProps {
  href: string;
}
export const RouterLink = forwardRef<HTMLAnchorElement, IRouterLinkProps>(({ href, ...other }, ref) => (
  <Link ref={ref} to={href} {...other} />
));
