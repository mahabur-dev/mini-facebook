export function LoadingOverlay() {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75" style={{ zIndex: 1050 }}>
      <div className="spinner-border" role="status" aria-label="Loading" />
    </div>
  );
}
