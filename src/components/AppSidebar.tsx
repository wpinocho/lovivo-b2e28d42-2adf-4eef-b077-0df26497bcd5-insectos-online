import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Bug, Home, ShoppingBag, Info, Phone, Star } from 'lucide-react';

const menuItems = [
  {
    title: "Inicio",
    url: "#home",
    icon: Home,
  },
  {
    title: "Catálogo",
    url: "#catalog",
    icon: ShoppingBag,
  },
  {
    title: "Destacados",
    url: "#featured",
    icon: Star,
  },
  {
    title: "Acerca de",
    url: "#about",
    icon: Info,
  },
  {
    title: "Contacto",
    url: "#contact",
    icon: Phone,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Bug className="w-8 h-8 text-green-600" />
          <div>
            <h2 className="font-bold text-lg">InsectoShop</h2>
            <p className="text-xs text-gray-600">Tienda de Insectos</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="text-xs text-gray-500 text-center">
          <p>© 2024 InsectoShop</p>
          <p>Especialistas en insectos</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}