import { createResourceAction } from '../app/actions/createResource';
import LoginForm from './login-form';
import { Layers2, Plus, User } from 'lucide-react';
import React from 'react';
import { auth } from '~/auth';
import ResourceForm from '~/components/resource-form';
import ResourceSearch from '~/components/resource-search';
import ThemeToggle from '~/components/theme-toggle';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

const Header = async () => {
  const session = await auth();

  return (
    <header className="sticky top-0 z-10 flex h-12 items-center justify-between gap-2 border-b border-border-foreground bg-background px-4">
      <div className="flex items-center gap-2">
        <Layers2 />
        <h1 className="hidden font-bold sm:block">Frontend/hub</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="grid place-items-center md:hidden">
          <ResourceSearch />
        </div>

        {session?.user ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={'outline'} size={'icon'}>
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new Resource</DialogTitle>
                <ResourceForm submitAction={createResourceAction} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={'outline'} size={'icon'}>
                <User />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter with credentials</DialogTitle>
              </DialogHeader>
              <LoginForm />
            </DialogContent>
          </Dialog>
        )}

        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
