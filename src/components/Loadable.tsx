import { Suspense } from "react";

import LoadingBar from "./UI/LoadingBar";

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable =
  <P extends object>(Component: React.ComponentType<P>) =>
  (props: React.PropsWithChildren<P>) =>
    (
      <Suspense fallback={<LoadingBar />}>
        <Component {...props} />
      </Suspense>
    );

export default Loadable;
