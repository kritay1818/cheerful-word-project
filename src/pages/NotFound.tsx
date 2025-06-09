
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import ClayCard from "@/components/ClayCard";
import { Mail } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-slate-700 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-slate-600 mb-4">הדף לא נמצא</h2>
          <p className="text-lg text-slate-500 mb-6">מצטערים, הדף שחיפשת אינו קיים</p>
          <Link 
            to="/" 
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl font-medium transition-colors"
          >
            חזור לעמוד הבית
          </Link>
        </div>

        {/* Contact Section */}
        <ClayCard className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center shadow-[inset_0_2px_8px_rgba(255,255,255,0.3)]">
            <Mail className="w-6 h-6 text-blue-800" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-3">צור איתנו קשר</h3>
          <p className="text-slate-600 mb-4">
            יש לך בקשות או פידבק? נשמח לשמוע ממך
          </p>
          <a 
            href="mailto:itaykritmaler@gmail.com" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            <Mail className="w-4 h-4 ml-2" />
            itaykritmaler@gmail.com
          </a>
        </ClayCard>
      </div>
    </div>
  );
};

export default NotFound;
