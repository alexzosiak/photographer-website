import type { ReactNode } from 'react';
import '../../scss/page-transition.scss';

export default function Template({ children }: { children: ReactNode }) {
    return <main className="page">{children}</main>;
}
