import { useState } from "react";
import BookingForm from "../components/BookingForm";

export default function BookingSearch() {
  const [results, setResults] = useState(null);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Cars</h1>
      <BookingForm onResults={setResults} />

      {results && (
        <div className="mt-4">
          {results.available ? (
            <p>Car available for {results.rentalDays} days</p>
          ) : (
            <p>Cars not available for selected dates</p>
          )}
        </div>
      )}
    </div>
  );
}
