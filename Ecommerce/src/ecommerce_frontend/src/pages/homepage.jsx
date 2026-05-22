import React from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../component/Button';

const HomePage = () => {

  const location = useLocation();

  // Safe fallback
  const userData = location.state?.userData || null;

  console.log("UserData:", userData);
  return (
    <div className="flex flex-col items-center justify-center text-center px-6">

      {/* Hero Section */}
      <div className="max-w-3xl mt-20 space-y-6">

        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">

          {userData
            ? `Welcome back, ${userData.username}!`
            : "The Future of Shopping is Here."
          }

        </h1>

        <p className="text-lg text-gray-600">

          {userData
            ? "Ready to pick up where you left off? Check out your personalized recommendations below."
            : "Join thousands of users and explore the most advanced PLM-integrated marketplace."
          }

        </p>

        <div className="flex justify-center space-x-4">

          <Button size="lg">
            Explore Products
          </Button>

          {!userData && (
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          )}

        </div>

      </div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-6xl pb-20">

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-64 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-400"
          >
            Featured Product {item}
          </div>
        ))}

      </div>

    </div>
  );
};

export default HomePage;