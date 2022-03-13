import type { NextPage } from 'next';
import { Link } from '../components/link';
import { Meta } from '../components/meta';

const AttributionsPage: NextPage = () => {
  return (
    <>
      <Meta title="Attributions" />

      <div className="text-lg">
        This website uses the following publicly available external assets:
      </div>

      <ul className="list-disc px-8">
        <li>
          <span className="font-semibold">
            <Link href="https://flaticon.com/free-icon/ukraine_197572">
              Ukraine icon by Freepik
            </Link>
          </span>{' '}
          <span>(Flaticon license)</span>
        </li>
      </ul>
    </>
  );
};

export default AttributionsPage;
