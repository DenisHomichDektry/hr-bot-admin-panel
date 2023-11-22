import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Path } from '@remix-run/router/history.ts';

// ----------------------------------------------------------------------

export function useRouter() {
  const navigate = useNavigate();

  const router = useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(1),
      reload: () => window.location.reload(),
      push: (href: string | Partial<Path>) => navigate(href),
      replace: (href: string | Partial<Path>) => navigate(href, { replace: true }),
    }),
    [navigate],
  );

  return router;
}
