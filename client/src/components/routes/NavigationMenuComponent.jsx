import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import '../../styles/Navigation.css';

function NavigationMenuComponent() {
  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        <div className="grid grid-cols-12 ">
          <NavigationMenu.Item className="col-span-1 col-start-1">
            <NavigationMenu.Link
              className="NavigationMenuLink "
              href="/"
            >
              Home
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item className="col-span-1 col-start-2">
            <NavigationMenu.Link
              className="NavigationMenuLink "
              href="/about"
            >
              About
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item className="col-span-1 col-start-11">
            <NavigationMenu.Link
              className="NavigationMenuLink "
              href="/login"
            >
              Login
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item className="col-span-1 col-start-12">
            <NavigationMenu.Link
              className="NavigationMenuLink"
              href="/sign-up"
            >
              Sign Up
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </div>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

export default NavigationMenuComponent;
