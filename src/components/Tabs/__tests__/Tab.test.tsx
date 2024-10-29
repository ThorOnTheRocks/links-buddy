import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tab, TabList, TabPanel } from '../components';
import { useTabs } from '../hooks/useTabs';

const TestTabs = () => {
  const { getTabListProps, getTabProps, getTabPanelProps } = useTabs({
    defaultTab: 'tab1',
  });

  return (
    <div>
      <TabList {...getTabListProps()}>
        <Tab {...getTabProps('tab1')}>Tab 1</Tab>
        <Tab {...getTabProps('tab2')}>Tab 2</Tab>
        <Tab {...getTabProps('tab3')} disabled>
          Tab 3
        </Tab>
      </TabList>

      <TabPanel {...getTabPanelProps('tab1')}>Content 1</TabPanel>
      <TabPanel {...getTabPanelProps('tab2')}>Content 2</TabPanel>
      <TabPanel {...getTabPanelProps('tab3')}>Content 3</TabPanel>
    </div>
  );
};

describe('Tabs', () => {
  describe('TabList', () => {
    it('should render all tabs', () => {
      render(<TestTabs />);

      expect(
        screen.getByRole('tab', { name: 'Tab 1' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('tab', { name: 'Tab 2' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('tab', { name: 'Tab 3' })
      ).toBeInTheDocument();
    });

    it('should have correct ARIA attributes', () => {
      render(<TestTabs />);

      const tabList = screen.getByRole('tablist');
      expect(tabList).toHaveAttribute(
        'aria-orientation',
        'horizontal'
      );
    });
  });

  describe('Tab', () => {
    it('should show correct tab as selected', () => {
      render(<TestTabs />);

      expect(
        screen.getByRole('tab', { name: 'Tab 1' })
      ).toHaveAttribute('aria-selected', 'true');
      expect(
        screen.getByRole('tab', { name: 'Tab 2' })
      ).toHaveAttribute('aria-selected', 'false');
    });

    it('should handle disabled tabs', () => {
      render(<TestTabs />);

      expect(
        screen.getByRole('tab', { name: 'Tab 3' })
      ).toBeDisabled();
    });

    it('should change selected tab on click', async () => {
      render(<TestTabs />);

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      await userEvent.click(tab2);

      expect(tab2).toHaveAttribute('aria-selected', 'true');
      expect(
        screen.getByRole('tabpanel', { name: 'Tab 2' })
      ).not.toHaveAttribute('hidden');
    });
  });

  describe('TabPanel', () => {
    it('should show correct content for selected tab', () => {
      render(<TestTabs />);

      const panels = screen.getAllByRole('tabpanel', {
        hidden: true,
      });

      expect(panels[0]).not.toHaveAttribute('hidden');
      expect(panels[0]).toHaveTextContent('Content 1');

      expect(panels[1]).toHaveAttribute('hidden', '');
      expect(panels[2]).toHaveAttribute('hidden', '');
    });

    it('should switch content when changing tabs', async () => {
      render(<TestTabs />);

      const panels = screen.getAllByRole('tabpanel', {
        hidden: true,
      });
      expect(panels[0]).not.toHaveAttribute('hidden');
      expect(panels[1]).toHaveAttribute('hidden', '');

      await userEvent.click(
        screen.getByRole('tab', { name: /tab 2/i })
      );

      expect(panels[0]).toHaveAttribute('hidden', '');
      expect(panels[1]).not.toHaveAttribute('hidden');
      expect(panels[1]).toHaveTextContent('Content 2');
    });

    it('should have correct ARIA attributes', () => {
      render(<TestTabs />);

      const tab = screen.getByRole('tab', { name: /tab 1/i });
      const panel = screen.getByRole('tabpanel');

      expect(tab).toHaveAttribute('id', 'tab-tab1');
      expect(tab).toHaveAttribute('aria-controls', 'panel-tab1');
      expect(panel).toHaveAttribute('id', 'panel-tab1');
      expect(panel).toHaveAttribute('aria-labelledby', 'tab-tab1');
      expect(panel).toHaveAttribute('tabindex', '0');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should handle arrow right navigation', async () => {
      render(<TestTabs />);

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      await userEvent.tab();
      expect(tab1).toHaveFocus();

      await userEvent.keyboard('{ArrowRight}');
      expect(
        screen.getByRole('tab', { name: 'Tab 2' })
      ).toHaveFocus();
    });

    it('should handle arrow left navigation', async () => {
      render(<TestTabs />);

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      tab2.focus();

      await userEvent.keyboard('{ArrowLeft}');
      expect(
        screen.getByRole('tab', { name: 'Tab 1' })
      ).toHaveFocus();
    });

    it('should wrap around when reaching the ends', async () => {
      render(<TestTabs />);

      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      firstTab.focus();

      await userEvent.keyboard('{ArrowLeft}');
      expect(
        screen.getByRole('tab', { name: 'Tab 2' })
      ).toHaveFocus();
    });

    it('should skip disabled tabs', async () => {
      render(<TestTabs />);

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      tab2.focus();

      await userEvent.keyboard('{ArrowRight}');
      expect(
        screen.getByRole('tab', { name: 'Tab 1' })
      ).toHaveFocus();
    });

    it('should handle Home and End keys', async () => {
      render(<TestTabs />);

      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      firstTab.focus();

      await userEvent.keyboard('{End}');
      expect(
        screen.getByRole('tab', { name: 'Tab 2' })
      ).toHaveFocus();

      await userEvent.keyboard('{Home}');
      expect(
        screen.getByRole('tab', { name: 'Tab 1' })
      ).toHaveFocus();
    });
  });
});
