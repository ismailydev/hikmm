import java.awt.*;
import javax.swing.*;
import java.awt.event.*;

public class ProjectGUI implements ActionListener {
    // encapsulation?
    int primaryColor = 0x1e2534;
    int secondaryColor = 0xC4C4C4;
    String primaryFont = "Sora";
    String secondaryFont = "Montserrat";
    JFrame frame;
    JPanel panel1, panel2, signingPanel;
    JLabel logoLabel, logoLabelDesc1, logoLabelDesc2, introLabel, usernameLabel, passwordLabel;
    JTextField usernameField;
    JPasswordField passwordField;
    ImageIcon logo, logoWithBg, introImage;
    JButton signInButton, signUpButton;
    JToggleButton tg;

    ProjectGUI() {

        logo = new ImageIcon("Files\\logo.png");
        logoWithBg = new ImageIcon("Files\\logoWithBg.png");
        // introImage = new ImageIcon("test\\hikmm\\Files\\introImage.jpg");

        // panel1

        logoLabel = new JLabel("HIKMM");
        logoLabel.setForeground(Color.WHITE);
        logoLabel.setFont(new Font(primaryFont, Font.BOLD, 40));
        logoLabel.setIcon(logo);
        logoLabel.setBounds(150, 147, 157, 185);
        logoLabel.setHorizontalTextPosition(JLabel.CENTER);
        logoLabel.setVerticalTextPosition(JLabel.BOTTOM);
        logoLabel.setIconTextGap(25);

        logoLabelDesc1 = new JLabel("Store Management");
        logoLabelDesc1.setForeground(Color.WHITE);
        logoLabelDesc1.setFont(new Font(secondaryFont, Font.PLAIN, 35));
        logoLabelDesc1.setBounds(55, 351, 500, 40);
        logoLabelDesc2 = new JLabel("            System"); // ?????????
        logoLabelDesc2.setForeground(Color.WHITE);
        logoLabelDesc2.setFont(new Font(secondaryFont, Font.PLAIN, 35));
        logoLabelDesc2.setBounds(55, 390, 500, 55);
        // logoLabelDesc2.setHorizontalAlignment(JLabel.CENTER);
        // logoLabelDesc2.setHorizontalTextPosition(JLabel.CENTER);

        panel1 = new JPanel();
        panel1.setBounds(0, 0, 450, 600);
        panel1.setBackground(new Color(primaryColor));
        panel1.setLayout(null);
        panel1.add(logoLabel);
        panel1.add(logoLabelDesc1);
        panel1.add(logoLabelDesc2);

        // panel2

        // introLabel = new JLabel();
        // introLabel.setIcon(introImage);
        // introLabel.setBounds(0, -15, 450, 600);

        usernameLabel = new JLabel("Username: ");
        passwordLabel = new JLabel("Password: ");
        usernameField = new JTextField(20);
        passwordField = new JPasswordField(20);

        signInButton = new JButton("Sign in");
        signInButton.setBackground(new Color(primaryColor));
        signInButton.setForeground(new Color(secondaryColor));
        signInButton.setFont(new Font(secondaryFont, Font.PLAIN, 20));
        signInButton.setSize(150, 50);
        signInButton.setFocusable(false);
        signInButton.addActionListener(this);

        signUpButton = new JButton("Sign up");
        signUpButton.setBackground(new Color(primaryColor));
        signUpButton.setForeground(new Color(secondaryColor));
        signUpButton.setFont(new Font(secondaryFont, Font.PLAIN, 20));
        signUpButton.setSize(150, 50);
        signUpButton.setFocusable(false);
        signUpButton.addActionListener(this);

        signingPanel = new JPanel();
        // signingPanel.setBounds(450, 200, 450, 200);
        signingPanel.setBackground(Color.BLACK);
        signingPanel.add(usernameLabel);
        signingPanel.add(usernameField);
        signingPanel.add(passwordLabel);
        signingPanel.add(passwordField);
        signingPanel.add(signInButton);
        signingPanel.add(signUpButton);

        panel2 = new JPanel();
        panel2.setLayout(new GridBagLayout());
        GridBagConstraints c = new GridBagConstraints();
        signingPanel.setMinimumSize(new Dimension(600, 600));
        signingPanel.setMaximumSize(new Dimension(600, 600));
        signingPanel.setPreferredSize(new Dimension(600, 600));
        panel2.setBounds(450, 0, 450, 600);
        panel2.setBackground(new Color(secondaryColor));
        panel2.add(signingPanel);
        // panel2.add(introLabel);

        frame = new JFrame();
        frame.setTitle("HIKMM");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setIconImage(logoWithBg.getImage()); // change app icon
        frame.setSize(917, 639); // to make the frame without the top menu a 900 x 600 exactly
        frame.setLayout(null);
        frame.setResizable(false);
        frame.setVisible(true);
        frame.add(panel1);
        frame.add(panel2);
    }

    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == signInButton) {
            // new SignInPage();
            System.out.println("Sign in");
        }
        if (e.getSource() == signUpButton) {
            // new SignUpPage();
            System.out.println("Sign up");
        }
    }
}